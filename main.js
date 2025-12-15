"use strict";
/**
 * Creature object that contains relevant details. Also contains references to ValInp objects that contain
 * form elements and their values
 */
class Creature {
    constructor(formSelector) {
        this.name = new ValInp(['.input'], formSelector, 'Name..');
        this.size = new ValInp(['.input'], formSelector, 'Size (m)..');
        this.age = new ValInp(['.input'], formSelector, 'Age..');
        this.weight = new ValInp(['.input'], formSelector, 'Weight (kg)..');
        this.food = new ValInp(['.input'], formSelector, 'Food..');
    }
}
/**
 * Utility class that combines HTMLElement reference and value into one. Also automatically
 * inserts the generated element into the relevant column
 */
class ValInp {
    constructor(classes, targetSelector, placeholder) {
        this.value = '';
        this.element = document.createElement('input');
        for (let entry of classes) {
            this.element.classList.add(entry);
        }
        let target = document.querySelector(targetSelector);
        this.element.placeholder = placeholder;
        this.element.addEventListener('change', event => {
            this.value = this.element.value;
        });
        target.append(this.element);
    }
}
let creature1 = new Creature('.c1-column');
let creature2 = new Creature('.c2-column');
// Run button logic that generates the combined creature output
document.querySelector('.run-button')?.addEventListener('click', event => {
    let output = document.querySelector('.output');
    output.innerHTML = `
    Name: ${mixString(creature1.name.value, creature2.name.value)}
    Size: ${(Number(creature1.size.value) + Number(creature2.size.value)) / 2}m
    Age: ${Number(creature1.age.value) * Number(creature2.age.value) / 2}
    Weight: ${Number(creature1.age.value) + Number(creature2.age.value)}kg
    Food: ${[creature1.food.value, creature2.food.value][Math.floor(Math.random() * 2)]}
    `;
    let image = document.querySelector('.success-graphic');
    image.style.display = 'block';
});
/**
 * Utility function to mix two strings together by putting the second one in the middle of the first one
 */
function mixString(string1, string2) {
    let midIndex = Math.floor(string1.length / 2);
    return string1.slice(0, midIndex) + string2 + string1.slice(midIndex);
}
