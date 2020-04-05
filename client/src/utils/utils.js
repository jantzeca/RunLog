const baseURL = 'http://localhost:4000';

export const ajaxRequest = async (
  { body, headers, route, method, auth }
) => {
  let xhr = new XMLHttpRequest();
  const url = `${baseURL}${route}`;
  xhr.open(method, url, true, auth.email, auth.password);
  // xhr.withCredentials = true;
  Object.entries(headers).forEach(([key, val]) => xhr.setRequestHeader(key, val));
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
  xhr.send(body);
};
