const baseURL = 'https://localhost:4000';

export const ajaxRequest = async (
  { body, headers, method },
  email = null,
  password = null
) => {
  let xhr = new XMLHttpRequest();
  const url = `${baseURL}/auth`;
  xhr.open(method, url, true, email, password);
  // xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts?_limit=10', true);
  // xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/text');
  Object.entries(headers).forEach(h => xhr.setRequestHeader(h[0], h[1]));
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.status);
      console.log(xhr.response);
    } else {
      console.log('some error happend');
    }
  };
  xhr.onerror = () => {
    console.log('Error');
  };
  console.log(body);
  xhr.send(body);
};
