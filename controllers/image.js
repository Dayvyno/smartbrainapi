import Clarifai from 'clarifai';
const app = new Clarifai.App({apiKey: "46bfa20600d342da92980ff2813a26c0"});

export const handleApiCall = (req, res)=>{

  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data=>{res.json(data)})
  .catch(err=> res.status(400).json('Unable to work with API'))
} 

export const imageHandler = (req, res, db)=>{
  const {id} = req.body;

  db('users').where('id', '=', id).increment({entries: 1}).returning('entries')
    .then(count=>{res.json(count[0])})
    .catch(err=>res.status(400).json("Unable to get number of entries"))
}


// f76196b43bbd45c99b4f3cd8e8b40a8a