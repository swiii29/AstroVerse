const API_BASE_URL = "http://localhost:5001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("astroverseToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getCelestialObjects = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/celestial-objects`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch celestial objects");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching celestial objects:",
      error
    );

    throw error;
  }
};

export const getPublicObservations = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations/public`
    );

    if (!response.ok) {
      const result = await response.json();

      throw new Error(
        result.message || "Failed to fetch public observations"
      );
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching public observations:",
      error
    );

    throw error;
  }
};

export const getObservations = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const result = await response.json();

      throw new Error(
        result.message || "Failed to fetch observations"
      );
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching observations:",
      error
    );

    throw error;
  }
};

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

    if (!response.ok) {
      const result = await response.json();

      throw new Error(
        result.message || "Failed to create observation"
      );
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error creating observation:",
      error
    );

    throw error;
  }
};

export const deleteObservation = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/observations/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const result = await response.json();

      throw new Error(
        result.message || "Failed to delete observation"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error deleting observation:",
      error
    );

    throw error;
  }
};

export const getLunarBases = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/lunar-bases`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch lunar bases");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching lunar bases:",
      error
    );

    throw error;
  }
};

export const getMissions = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/missions`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch missions");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(
      "Error fetching missions:",
      error
    );

    throw error;
  }
};