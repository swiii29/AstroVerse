const API_BASE_URL = "https://astroverse-9h7i.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("astroverseToken");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseResponse = async (response, defaultMessage) => {
  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      response.ok
        ? defaultMessage
        : `Server error (${response.status}). Please try again.`
    );
  }

  if (!response.ok) {
    throw new Error(result.message || defaultMessage);
  }

  return result;
};

// ================================
// CELESTIAL OBJECTS
// ================================

export const getCelestialObjects = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/celestial-objects`
    );

    const result = await parseResponse(
      response,
      "Failed to fetch celestial objects"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching celestial objects:",
      error
    );

    throw error;
  }
};

// ================================
// PUBLIC OBSERVATIONS
// ================================

export const getPublicObservations = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations/public`
    );

    const result = await parseResponse(
      response,
      "Failed to fetch public observations"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching public observations:",
      error
    );

    throw error;
  }
};

// ================================
// MY OBSERVATIONS
// ================================

export const getObservations = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations`,
      {
        headers: getAuthHeaders(),
      }
    );

    const result = await parseResponse(
      response,
      "Failed to fetch observations"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching observations:",
      error
    );

    throw error;
  }
};

// ================================
// CREATE OBSERVATION
// ================================

export const createObservation = async (observation) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(observation),
      }
    );

    const result = await parseResponse(
      response,
      "Failed to create observation"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error creating observation:",
      error
    );

    throw error;
  }
};

// ================================
// DELETE OBSERVATION
// ================================

export const deleteObservation = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    return await parseResponse(
      response,
      "Failed to delete observation"
    );
  } catch (error) {
    console.error(
      "Error deleting observation:",
      error
    );

    throw error;
  }
};

// ================================
// LUNAR BASES
// ================================

export const getLunarBases = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/lunar-bases`
    );

    const result = await parseResponse(
      response,
      "Failed to fetch lunar bases"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching lunar bases:",
      error
    );

    throw error;
  }
};

// ================================
// MISSIONS
// ================================

export const getMissions = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/missions`
    );

    const result = await parseResponse(
      response,
      "Failed to fetch missions"
    );

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching missions:",
      error
    );

    throw error;
  }
};