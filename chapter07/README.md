# Chapter 07. Building application and context menus

## Overview 

- Creating menus using Electron's `Menu` and `MenuItem` modules
- Building menus from a template
- Defining custom menus for target operating systems
- Assigning common operating system roles to our menu items
- Making menu items with custom, applicationspecific functionality
- Creating custom context menus for different parts of your UI

## Electron vs Browser 
- In browser-based applications, the entire UI for the application's functionality must be inside of the window
- A menu structure for Fire Sale to implement goes as 
  ![The structure of the application menu for Fire Sale](images/menu-structure-overview.png)

## 7.1 Replacing and replicating the default menu 

- Electron includes the `Menu` and `MenuItem` modules for building menus
- Building a menu out of individual `MenuItems` can be tedious and error prone
- As a convenience, `Menu` provides the `buildFromTemplate()`  method that accepts an array of regular JavaScript objects. Internally, Electron creates the `MenuItems` based on the array you provided

### 7.1.1 macOS and the case of the missing `Edit` menu 


### The hidden cost of replacing Electron's default menu 
### Implementing the Edit and Window menus 
### Defining menu item roles and keyboard shortcuts 
### Restoring the application menu on macOS 
### Adding a Help menu 
## 7.2 Adding application-specific menu functionality 
### Handling the case of having no focused window 
## 7.3 Building context menus 