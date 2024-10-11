import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación

const Home = () => {
  const [users, setUsers] = useState([]); // Estado para la lista de usuarios
  const [loginResult, setLoginResult] = useState(null); // Estado para el resultado de login

  const { authState } = useAuth(); // Obtener el estado de autenticación
  const { token, authenticated } = authState; // Extraer el token y el estado de autenticación

  // useEffect para hacer la llamada a ${API_URL}/login
  useEffect(() => {
    const loginUser = async () => {
      if (authenticated && token) { // Verificar si está autenticado y hay token
        try {
          const result = await axios.post(`${API_URL}/check-session`, {token});

          console.log(result.data.username)
          setLoginResult(result.data.username); // Guardar el resultado de login
        } catch (e) {
          alert(e.message);
        }
      }
    };
    loginUser();
  }, [authenticated, token]); // Ejecutar el efecto solo cuando cambie el token o el estado de autenticación

  // useEffect para hacer la llamada a ${API_URL}/users
  useEffect(() => {
    const loadUsers = async () => {
      if (authenticated && token) { // Solo cargar usuarios si está autenticado y hay token
        try {
          const result = await axios.get(`${API_URL}/users`);
          setUsers(result.data); // Guardar la lista de usuarios en el estado
        } catch (e) {
          alert(e.message);
        }
      }
    };
    loadUsers();
  }); // Ejecutar el efecto solo cuando cambie el token o el estado de autenticación

  return (
    <ScrollView>
      <Text style={styles.title}>Resultado del Login:</Text>
      {loginResult ? (
        <Text>{JSON.stringify(loginResult)}</Text>
      ) : (
        <Text>No login result available</Text>
      )}

      <Text style={styles.title}>Lista de Usuarios (desde /users):</Text>
      {users && Array.isArray(users) && users.length > 0 ? (
        users.map(user => (
          <Text key={user.iduser}>
            {user.username}
          </Text>
        ))
      ) : (
        <Text>No users available</Text>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 22,
    marginBottom: 22
  }
});
