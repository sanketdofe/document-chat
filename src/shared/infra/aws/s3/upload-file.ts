import { S3 } from '@aws-sdk/client-s3';

interface UploadFileToS3Params {
  bucket: string;
  credentials: {
    AccessKeyId: string;
    SecretAccessKey: string;
    SessionToken: string;
    Expiration: string;
  };
  keys: string[];
  files: File[];
  region: string;
}

export const uploadFileToS3 = async ({
  bucket,
  credentials,
  keys,
  files,
  region,
}: UploadFileToS3Params) => {
  const client = new S3({
    credentials: {
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: credentials.SecretAccessKey,
      sessionToken: credentials.SessionToken,
    },
    region,
  });

  await Promise.all(
    files.map((file, idx) => {
      const type = file.type;
      return client.putObject({
        Key: keys[idx],
        Body: file,
        ContentType: type,
        Bucket: bucket,
      });
    })
  );
};
