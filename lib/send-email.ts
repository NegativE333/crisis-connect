import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const sendEmails = (
    title: string,
    type: string,
    emails: string[],
    description: string,
    location: string,
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const params = {
            Destination: {
                ToAddresses: emails
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `
                        <!DOCTYPE html>

                        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                        <head>
                        <title></title>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                        <style>
                                * {
                                    box-sizing: border-box;
                                }
                        
                                body {
                                    margin: 0;
                                    padding: 0;
                                }
                        
                                a[x-apple-data-detectors] {
                                    color: inherit !important;
                                    text-decoration: inherit !important;
                                }
                        
                                #MessageViewBody a {
                                    color: inherit;
                                    text-decoration: none;
                                }
                        
                                p {
                                    line-height: inherit
                                }
                        
                                .desktop_hide,
                                .desktop_hide table {
                                    mso-hide: all;
                                    display: none;
                                    max-height: 0px;
                                    overflow: hidden;
                                }
                        
                                .image_block img+div {
                                    display: none;
                                }
                        
                                @media (max-width:520px) {
                                    .desktop_hide table.icons-inner {
                                        display: inline-block !important;
                                    }
                        
                                    .icons-inner {
                                        text-align: center;
                                    }
                        
                                    .icons-inner td {
                                        margin: 0 auto;
                                    }
                        
                                    .mobile_hide {
                                        display: none;
                                    }
                        
                                    .row-content {
                                        width: 100% !important;
                                    }
                        
                                    .stack .column {
                                        width: 100%;
                                        display: block;
                                    }
                        
                                    .mobile_hide {
                                        min-height: 0;
                                        max-height: 0;
                                        max-width: 0;
                                        overflow: hidden;
                                        font-size: 0px;
                                    }
                        
                                    .desktop_hide,
                                    .desktop_hide table {
                                        display: table !important;
                                        max-height: none !important;
                                    }
                        
                                    .row-1 .column-1 .block-1.heading_block h1 {
                                        font-size: 22px !important;
                                    }
                        
                                    .row-1 .column-1 .block-4.paragraph_block td.pad>div {
                                        font-size: 15px !important;
                                    }
                        
                                    .row-1 .column-1 .block-3.paragraph_block td.pad>div {
                                        font-size: 17px !important;
                                    }
                        
                                    .row-1 .column-1 .block-3.paragraph_block td.pad,
                                    .row-1 .column-1 .block-5.button_block td.pad {
                                        padding: 15px !important;
                                    }
                        
                                    .row-1 .column-1 .block-5.button_block a,
                                    .row-1 .column-1 .block-5.button_block div,
                                    .row-1 .column-1 .block-5.button_block span {
                                        font-size: 12px !important;
                                        line-height: 24px !important;
                                    }
                                }
                            </style>
                        </head>
                        <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
                        <tbody>
                        <tr>
                        <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tbody>
                        <tr>
                        <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
                        <tbody>
                        <tr>
                        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tr>
                        <td class="pad">
                        <h1 style="margin: 0; color: #4a0e14; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span class="tinyMce-placeholder">${type} alert from <span style="color: #ee3232;">Crisis Connect </span>in ${location}</span></h1>
                        </td>
                        </tr>
                        </table>
                        <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tr>
                        <td class="pad">
                        <div align="center" class="alignment">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tr>
                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span> </span></td>
                        </tr>
                        </table>
                        </div>
                        </td>
                        </tr>
                        </table>
                        <table border="0" cellpadding="25" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                        <tr>
                        <td class="pad">
                        <div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:22px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:26.4px;">
                        <p style="margin: 0;">${title}</p>
                        </div>
                        </td>
                        </tr>
                        </table>
                        <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                        <tr>
                        <td class="pad">
                        <div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
                        <p style="margin: 0;">${description}</p>
                        </div>
                        </td>
                        </tr>
                        </table>
                        <table border="0" cellpadding="10" cellspacing="0" class="button_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tr>
                        <td class="pad">
                        <div align="center" class="alignment"><!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:42px;width:278px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ef3d3e">
                        <w:anchorlock/>
                        <v:textbox inset="0px,0px,0px,0px">
                        <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
                        <![endif]--><a href="http://localhost:3000/" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ef3d3e;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Visit Crisis Connect to know more</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                        </td>
                        </tr>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
                        <tbody>
                        <tr>
                        <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 500px; margin: 0 auto;" width="500">
                        <tbody>
                        <tr>
                        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
                        <tr>
                        <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tr>
                        <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                        <!--[if !vml]><!-->
                        <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
                        <tr>
                        </tr>
                        </table>
                        </td>
                        </tr>
                        </table>
                        </td>
                        </tr>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table><!-- End -->
                        </body>
                        </html>`
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: `${type} alert`
                }
            },
            Source: "omtekade914@gmail.com"
        };

        ses.sendEmail(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
}