import {
  Breadcrumbs,
  Button,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import createNewChat from '../../request/new-chat';
import { useAtomValue, useSetAtom } from 'jotai';
import { AuthAtom } from '../../../../shared/states/authenticated';
import { AlertBarAtom } from '../../../../shared/states/alert-bar';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import { uploadFileToS3 } from '../../../../shared/infra/aws/s3/upload-file';
import { ChatListAtom } from '../../../../shared/states/chat';

const NewChat = () => {
  const [chatName, setChatName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const authToken = useAtomValue(AuthAtom);
  const setAlertbarAtom = useSetAtom(AlertBarAtom);
  const setChatListAtom = useSetAtom(ChatListAtom);

  const navigate = useNavigate();

  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = [];
    Array.prototype.forEach.call(event.target.files, function (file) {
      files.push(file);
    });
    setSelectedFiles(files);
  };

  const handleSubmitNewChat = useCallback(async () => {
    setSubmitted(true);

    try {
      const newChatCredentials = await createNewChat({
        authToken: authToken.token,
        documentNames: selectedFiles.map((file) => file.name),
        name: chatName,
      });

      await uploadFileToS3({
        bucket: newChatCredentials.bucket,
        credentials: newChatCredentials.credentials,
        keys: newChatCredentials.keys,
        files: selectedFiles,
        region: newChatCredentials.region,
      });
    } catch (e: any) {
      setAlertbarAtom({
        timeout: 5000,
        open: true,
        message: e.message,
        severity: 'error',
      });
    }

    setSubmitted(false);
    setChatName('');
    setSelectedFiles([]);
    setAlertbarAtom({
      timeout: 5000,
      open: true,
      message: 'Chat created successfully',
      severity: 'success',
    });

    setChatListAtom((prev) => ({
      ...prev,
      data: [...(prev.data ?? []), chatName],
    }));

    navigate(ROUTES.HOME);
  }, [
    authToken.token,
    chatName,
    navigate,
    selectedFiles,
    setAlertbarAtom,
    setChatListAtom,
  ]);

  return (
    <div className="flex flex-col items-center w-9/12 m-auto gap-10 mt-20">
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '2%' }}>
        <Link
          variant={'h5'}
          underline="hover"
          color="inherit"
          href={ROUTES.HOME}
        >
          All Chats
        </Link>
        <Typography
          variant={'h5'}
          style={{
            fontWeight: 'bold',
          }}
        >
          New Chat
        </Typography>
      </Breadcrumbs>
      <TextField
        className="w-11/12"
        label={'Chat Name'}
        value={chatName}
        onChange={handleChatNameChange}
        disabled={submitted}
        inputProps={{ maxLength: 20 }}
      />

      <Button className="w-11/12" variant="outlined" component="label">
        {selectedFiles.length
          ? `${selectedFiles.length} files selected`
          : 'Select Pdf Files'}
        <input
          type="file"
          hidden
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={submitted}
        />
      </Button>
      <Button
        size={'large'}
        variant={'contained'}
        onClick={handleSubmitNewChat}
        disabled={!chatName || !selectedFiles.length || submitted}
      >
        {submitted ? 'Creating...' : 'Create Chat'}
      </Button>
    </div>
  );
};

export default NewChat;
