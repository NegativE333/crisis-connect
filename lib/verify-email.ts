import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const ses = new AWS.SES({apiVersion : '2010-12-10'});

export const checkVerificationStatus = (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const params = {
            Identities: [email]
        };

        ses.getIdentityVerificationAttributes(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const VerificationAttributes = data.VerificationAttributes;
                if (
                    VerificationAttributes &&
                    VerificationAttributes[email] &&
                    VerificationAttributes[email].VerificationStatus === "Success"
                ) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}
