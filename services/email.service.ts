import {
  Configuration,
  EmailsApi,
  EmailMessageData,
  BodyContentType,
} from '@elasticemail/elasticemail-client-ts-axios';

const { ELASTICEMAIL_FROM, ELASTICEMAIL_API_KEY } = process.env;

const config = new Configuration({
  apiKey: ELASTICEMAIL_API_KEY,
});

const emailsApi = new EmailsApi(config);

export const emailMessageData: EmailMessageData = {
  Recipients: [
    {
      Email: 'tarik2454,test@gmail.com',
      Fields: {
        name: 'Name',
      },
    },
  ],
  Content: {
    Body: [
      {
        ContentType: BodyContentType.Html,
        Charset: 'utf-8',
        Content: 'My test email content ;)',
      },
      {
        ContentType: BodyContentType.PlainText,
        Charset: 'utf-8',
        Content: 'Hi {name}!',
      },
    ],
    Subject: 'Typescript Axios EE lib test',
    From: ELASTICEMAIL_FROM,
  },
};

export const sendBulkEmails = (emailMessageData: EmailMessageData): void => {
  emailsApi
    .emailsPost(emailMessageData)
    .then(response => {
      console.log('API called successfully.');
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

sendBulkEmails(emailMessageData);
