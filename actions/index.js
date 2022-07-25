export const ADD_ALL_PEOPLE = 'ADD_ALL_PEOPLE';
export const ADD_CONTACT = 'ADD_CONTACT' ;
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';

export function AddAllPeople(payload){
    return {
        type:'ADD_ALL_PEOPLE',
        payload
    }
}

export function AddContact(payload){
    return {
        type:'ADD_CONTACT',
        payload
    }
}

export function DeleteContact(payload){
    return {
        type:'DELETE_CONTACT',
        payload
    }
}

export function AddFavourite(payload){
    return {
        type:'ADD_FAVOURITE',
        payload
    }
}

export function DeleteFavourite(payload){
    return {
        type:'DELETE_FAVOURITE',
        payload
    }
}

export function SaveStorage(contacts){
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

export function GetStorage(){
    let contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
    contacts.forEach(function(contact){
        contact.createdAt = new Date(contact.createdAt);
    })
    
    return contacts
}

export function GetDefualtContact(){
    return { 
        id: 0, 
        name: '', 
        phone: '', 
        email: '', 
        createdAt: '' 
    }
}