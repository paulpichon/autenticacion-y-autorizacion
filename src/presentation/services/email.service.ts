import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
    from: string;
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}


export class EmailService {
    // definimos el transporte
    private transporter: Transporter; 
  
    constructor(
        // mailerService: string,
        // mailerEmail: string,
        // senderEmailPassword: string,

        // TITAN MAILER CONFIGURATION
        mailerHost: string,
        mailerPort: number,
        mailerSecure: boolean,
        mailerAuthUser: string,
        mailerAuthPassword: string,

    ) {
        this.transporter = nodemailer.createTransport( {
            // service: mailerService,
            // auth: {
            //     user: mailerEmail,
            //     pass: senderEmailPassword,
            // }

            // configuracion con mi propio servicio de CORREO ELECTRONICO (HOSTGATOR TITAN)
            host: mailerHost,
            port: mailerPort,
            secure: mailerSecure,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: mailerAuthUser,
                pass: mailerAuthPassword,
            },


        });
    }


    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { from, to, subject, htmlBody, attachements = [] } = options;


        try {
            const sentInformation = await this.transporter.sendMail( {
                from: from,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });
            // console.log( sentInformation );
            return true;
        } catch ( error ) {
            console.log(error);
            return false;
        }

    }

}
