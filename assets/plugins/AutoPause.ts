import MediaPlayer from "../MediaPlayer";

class AutoPause {
    private threshold: number;
    player: MediaPlayer;

    constructor(){
        this.threshold = 0.25;
        this.handlerInsersection = this.handlerInsersection.bind(this)
        this.hadlerVisibilityChange = this.hadlerVisibilityChange.bind(this)
    }

    run(player: MediaPlayer) {
        this.player = player
        const observer = new IntersectionObserver(this.handlerInsersection,{
            threshold: this.threshold
        })

        observer.observe(this.player.media)

        document.addEventListener("visibilitychange", this.hadlerVisibilityChange)
    }

    private handlerInsersection(entries) {
        const entry = entries[0]
        const isVisible = entry.intersectionRatio >= this.threshold
        isVisible? 
            this.player.play()
            : this.player.pause()
    }

    private hadlerVisibilityChange(){
        const isVisible = document.visibilityState === "visible"
        isVisible? 
            this.player.play()
            : this.player.pause()
    }

}

export default AutoPause;  