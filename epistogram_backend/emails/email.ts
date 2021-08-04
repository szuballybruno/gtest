import {transporter} from './transporter'
import {config} from "../configuration/config";

export const emailConfig = {
    message: {
      from: config.senderEmail
    },
    send: true,
    transport: transporter,
    views: {
      options: {
        extension: "hbs",
        map: {
          "hbs": "handlebars"
        }
      }
    },
    preview: false
}

export const emailContent = (email: string, name: string, url: string, mailToken: string) => {
    return {
        template: "setpassword",
        message: {
            to: email,
            subject: "Értesítés a regisztrációról"
        },
        locals: {
            nev: name,
            email: email,
            url: `${url}?token=${mailToken}`
        }
    }
}
