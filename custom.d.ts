declare module "*.svg" {
    const content: any;
    export default content;
}
//  Here we declare a new module for SVGs by specifying
//any import that ends in .svg and defining the 
//module's content as any. 
//We could be more explicit about it being a url by defining 
//the type as string. 
//The same concept applies to other assets including 
//CSS, SCSS, JSON and more.

