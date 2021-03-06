import { Fetch } from "../utils/Fetch";
import { convertGameToFetch } from "../utils/Converter";

export function closeSoccerGame({ id, score }, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/soccer/close/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: {
        score,
      },
    }).then((data) => {
      if (data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function updateGameScore({ id, score }, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/soccer/score/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: convertGameToFetch({ score }),
    }).then((data) => {
      if (data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function updateSoccerGame(gameData, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/soccer/${gameData.id}`, {
      method: "PATCH",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: convertGameToFetch(gameData),
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function deleteSoccerGame(gameData, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/soccer/${gameData.id}`, {
      method: "DELETE",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
    }).then((data) => {
      if (data.deleted || data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function scheduleSoccerGame({ visitor, visited, date }, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/soccer`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: {
        visitor,
        visited,
        date,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.success) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function removeClient({ id, email, name }, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/clients`, {
      method: "DELETE",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: {
        id,
        email,
        name,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.deleted) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function updatePayment({ sessionId, id, reference }, props) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/admin/payments/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
        body: {
          reference,
          props,
        },
      },
      { encrypt: true }
    ).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.acknowledged) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function removePayment({ sessionId, id }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/admin/payments/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.deleted) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function getAdminPayments({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/admin/payments/all`,
      {
        method: "GET",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
      },
      { encrypt: true }
    ).then((data) => {
      if (data.statusCode) return reject(data);
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function getAllUsers({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URI}/admin/clients/all`,
      {
        method: "GET",
        headers: {
          authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
        },
      },
      { encrypt: true }
    ).then((data) => {
      if (data.statusCode) return reject(data);
      if (Array.isArray(data)) return resolve(data);
      reject(data);
    }, reject);
  });
}
