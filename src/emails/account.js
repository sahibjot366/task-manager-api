
const sgmail=require('@sendgrid/mail');

sgmail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail=(email,name)=>{
    const msg={
        to:email,
        from:'sahibjot366@gmail.com',
        subject:'Welcome to our app!',
        text:`Hey ${name}, Thanks for using our app. We hope you will enjoy using it.If you have any complaints about this app,then you can mail us at sahibjot366@gmail.com`
    }
    sgmail.send(msg).then(()=>{
        console.log('email sent')
    }).catch(e=>{
        console.log(e)
    })
}

const sendRemovalEmail=(email,name)=>{
    const msg={
        to:email,
        from:'sahibjot366@gmail.com',
        subject:'GoodBye :(',
        text:`Hey ${name},We are sad that you are leaving our app. You can provide your feedback so that we can work on it. Sorry for inconvienience`
    }
    sgmail.send(msg).then(()=>{
        console.log('email sent')
    }).catch(e=>{
        console.log(e)
    })
}

module.exports={sendWelcomeEmail,sendRemovalEmail};

