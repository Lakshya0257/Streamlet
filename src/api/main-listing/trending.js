async function getTreadings(){
    let apiResponse={};     
      await fetch('https://api.themoviedb.org/3/discover/movie?api_key=cdaf1bf882dabe19e97e8dff74e06a22')
        .then((data)=>{
            apiResponse=data.json();
        })
        .catch((err)=>{
            console.log(err);
            return apiResponse;
        });

        if(Object.keys(apiResponse).length !== 0){
            return apiResponse
        }
}