export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public uid?: string,
        public image?: string,
        public role?: 'USER_ROLE' | 'ADMIN_ROLE',
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