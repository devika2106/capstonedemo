export default async function decorate(block) {

    block.classList.add('magazineWrapper');
    const classes = ['magazineContentWrapper', 'listofMagazineWrapper'];

    classes.forEach((c, i) => {
        block.children[i].classList.add(c);
    });


    const meta = await fetch('/metadata.json');
    const metaData = await meta.json();

    const listOfMagazine = document.querySelector('.listofMagazineWrapper div');
    const ul = document.createElement('ul');
    metaData.data.forEach((row) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = row.URL;
        const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = row.title;
        const date = document.createElement('span');
        date.classList.add('date');
        date.textContent = row.date;
        a.appendChild(title);
        a.appendChild(date);
        li.appendChild(a);
        ul.appendChild(li);
    });
    listOfMagazine.appendChild(ul);

    const separatorDiv = document.createElement('div');
    const separatorElement = document.createElement('hr');
    separatorDiv.classList.add('section', 'separator', 'authorSeparator');

    separatorElement.classList.add('separator');
    separatorDiv.appendChild(separatorElement);
    block.children[0].appendChild(separatorDiv);

}
