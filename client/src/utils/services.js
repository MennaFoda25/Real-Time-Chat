export const baseUrl = 'http://localhost:5000/api';

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data };
    }

    return data;
  } catch (error) {
    return { error: error.message || 'Something went wrong' };
  }
};


export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
      let message = data?.message || 'An error occurred';
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
