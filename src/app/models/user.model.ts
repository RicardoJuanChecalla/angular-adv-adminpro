export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public uid?: string,
        public image?: string,
        public role?: string,
        public google?: boolean,
    ){}

    get imageUrl(){
        return this.image;
    }

    set updateImageUrl(image: string){
        this.image = image;
    }

    printUser(){
        console.log(this.name);
    }
}