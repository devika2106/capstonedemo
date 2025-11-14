import createField from './form-fields.js';

async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  const heading = document.createElement('h3');
  heading.textContent = 'SIGN UP';
  form.appendChild(heading);
  form.dataset.action = submitHref;

  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
      fieldset.append(field);
    });
  });

  const successMesssage = document.createElement('p');
  successMesssage.textContent  = 'Registered Successfully!!!';
  successMesssage.id = 'successMessage';
  successMesssage.classList.add('hide');
  form.appendChild(successMesssage);
  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) payload[field.name] = payload[field.name] ? `${payload[field.name]},${field.value}` : field.value;
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

   
    // create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
     
    
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    const successMesssageBanner = document.getElementById('successMessage');
    successMesssageBanner.classList.remove('hide');
    successMesssageBanner.classList.add('show');
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;

    setTimeout(() => {
      const signupBlock = document.querySelector('.signup-block');
      if(signupBlock){
        signupBlock.classList.add('hide');
      }
      successMesssageBanner.classList.add('hide');

    [...form.elements].forEach((field) => {
      field.value = ''
    });
    },2000)
    
    
  }
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
  const submitLink = links.find((link) => link !== formLink);
  if (!formLink || !submitLink) return;

  const form = await createForm(formLink, submitLink);
 
  block.replaceChildren(form);
  const formWrapper = document.querySelector('.form');

  const signinBlock = document.querySelectorAll('.signin');
if (signinBlock.length == 1 )  { 
  const signupBtn = signinBlock[0].querySelector('button');
  if(signupBtn) {
    signupBtn.addEventListener('click', () =>{
     const signupBlock = document.querySelector('.signup-block');
     if(signupBlock.classList.contains('hide')){
      signupBlock.classList.remove('hide');
      signupBlock.classList.add('show')
     } else {
      signupBlock.classList.remove('show');
      signupBlock.classList.add('hide')
     }
    })
  }
}



  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}