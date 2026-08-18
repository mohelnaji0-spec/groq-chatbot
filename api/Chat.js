import Groq from "groq-sdk";


export default async function handler(req,res){


if(req.method !== "POST"){

return res.status(405).json({

error:"Method not allowed"

});

}


try{


const groq = new Groq({

apiKey:process.env.GROQ_API_KEY

});


const {message}=req.body;



const completion = await groq.chat.completions.create({

messages:[

{

role:"system",

content:"أنت مساعد ذكي تجيب باللغة العربية."

},

{

role:"user",

content:message

}

],


model:"llama-3.1-8b-instant"

});


return res.status(200).json({

reply:
completion.choices[0].message.content

});


}

catch(error){


console.error(error);


return res.status(500).json({

error:"Server error"

});


}


}
