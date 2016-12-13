# Boilerplate v1.0.0 

### Collection of technology to create projects in the `HTML structure`.
If you are looking for a set of tools that will help you create the website design - that is, you've come to the right place. I would however point out that in writing this code, I assumed that you have basic knowledge of design.

#### What you need to build your own project based on boilerplate?
In order to build it, you need to have the latest Node.js/npm and git 1.7 or later. Earlier versions might work, but are not supported. You need also gulp https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

#### How to start working with the project?
Clone a copy of the main boilerplate git repo by running:
```bash
git clone https://github.com/kwielicki/boilerplate.git
```
In the main folder there is a file _gulpfile.js_, which has a number of dependencies are used when building your application.To install them call in the main project folder command **npm install**.

#### Okay, now's look at its structure.
The main project directory contains two folders: `dev` and `prod`. _Dev folder_ - is a folder "builder", in which data is stored items such as Jade, Sass, Images, JavaScripts - all divided into the smallest possible modules.

> Let's start from `sass` folder.
It contains a library bootstrap v4.0.0 and the directory in which you gather your own styles for the project. The suggested structure is as follows:

* sass
 * bootstrap
 * site
   * components
      * _comp-footer.scss
      * _comp-header.scss
      * site-components.scss _import all your components into this file_
    * core
    * style.scss
