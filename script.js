console.log('Hi');
//Initialize the variable
let songIndex= 0;
let audioElement = new Audio('./songs/1.mp3');
console.log(parseInt(audioElement.duration));
let masterPlay  =document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = 
[
    { songName: 'Salam-e-ishq1', filePath:'./songs/1.mp3' , coverPath:'./covers/1.jpg'},
    { songName: 'Salam-e-ishq2', filePath:'./songs/2.mp3' , coverPath:'./covers/2.jpg'},
    { songName: 'Salam-e-ishq3', filePath:'./songs/3.mp3' , coverPath:'./covers/3.jpg'},
    { songName: 'Salam-e-ishq4', filePath:'./songs/4.mp3' , coverPath:'./covers/4.jpg'},
    { songName: 'Salam-e-ishq5', filePath:'./songs/5.mp3' , coverPath:'./covers/5.jpg'},
]


songItems.forEach((element,i) => {
    console.log(element,i);
 element.getElementsByTagName("img")[0].src = songs[i].coverPath;
 element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
 let x = new Audio(songs[i].filePath);

 document.getElementsByClassName('timestamp')[0].innerText = x.duration;
});
masterPlay.addEventListener('click',()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
}
else
{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    gif.style.opacity=0;
}
}
)


audioElement.addEventListener('timeupdate',()=>
{
    console.log('timeupdate');
    let progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>
{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeALLPlays = () =>
{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>
    {
        element.classList.add('fa-play');
    })
};

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        songIndex = parseInt(e.target.id);
        console.log(e);
        makeALLPlays();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        
        document.getElementsByClassName('mastersongname')[0].innerText = songs[songIndex-1].songName;
    })

})

document.getElementById('next').addEventListener('click',()=>
{
    if(songIndex==5)
    {
        songIndex=1;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})



document.getElementById('previous').addEventListener('click',()=>
{
    if(songIndex==1)
    {
        songIndex=5;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})