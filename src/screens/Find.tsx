import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código!",
          placement: "top",
          bgColor: "red.600",
        });
      }

      await api.post("pools/join", { code });

      toast.show({
        title: "Boa! Você entrou no bolão😎👊🏻",
        placement: "top",
        bgColor: "green.600",
      });

      setIsLoading(false);

      navigate('pools');

    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Poll not found.") {
        toast.show({
          title: "Bolão não encontrado! Verifica o código ai🙄",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this poll.") {
        toast.show({
          title: "Eita! Calma ai, você já tá nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não deu pra encontrar seu bolão😿, tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
