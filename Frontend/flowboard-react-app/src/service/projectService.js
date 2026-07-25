import { API_BASE_URL } from '../api/config';
import {mockProjects} from '../demo/projectMockData';


export async function getProjects() {

    const demoMode = localStorage.getItem("demoMode") === "true";

    


    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/project`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    return await response.json();
}
