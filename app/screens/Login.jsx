import { View, Text, Image, Button, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin(username, password); // Eliminado el uso de TypeScript's non-null assertion (!)
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister(username, password); // Eliminado el uso de TypeScript's non-null assertion (!)
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  useEffect(() => {
    //   const testCall = async () => {
    //     const result = await axios.get(`${API_URL}/users`);
    //     console.log(`Login.tsx ~ testCall ~ result: `, result);
    //   };
    //   testCall();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)} // No es necesario especificar el tipo 'string'
          value={username} // Muestra el valor actual del estado
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)} // No es necesario especificar el tipo 'string'
          value={password} // Muestra el valor actual del estado
        />
        <Button onPress={login} title="Sign in" />
        <Button onPress={register} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain"
  },
  form: {
    gap: 10,
    width: "60%"
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff"
  },
  container: {
    alignItems: "center",
    width: "100%"
  }
});

export default Login;
