import React from "react";
import {
  Button,
  Container,
  Heading,
  FormLabel,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Layout } from "../components/Layout";
import { useLocation } from "../hooks";
import { getCountryCoords, getNearstWarehouse } from "../utils";

const AMAZON_API_URL = "https://api.rainforestapi.com/request";
const ECO2MMERCE_API_URL =
  import.meta.env.VITE_ECO2MMERCE_API_URL ?? "https://api.eco2mmerce.tech";

const CalculatorPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ url: string }>();
  const location = useLocation();

  const onSubmit = async (data: { url: string }) => {
    const response = await (
      await fetch(
        `${AMAZON_API_URL}?api_key=${
          import.meta.env.VITE_AMAZON_API_KEY
        }&type=product&url=${data.url}`
      )
    ).json();
    const country_of_origin =
      response?.product?.specifications?.filter(
        (a: { name: string }) =>
          a.name === "Country of Origin" || a.name === "Country"
      )[0]?.value ?? "China";

    const weight = response?.product?.weight.split(" ");
    weight[0] = parseFloat(weight[0]);
    const weight_in_lbs =
      weight[1] === "kg" ? Math.round(weight[0] * 2.20462) : weight[0];

    const warehouse = await getNearstWarehouse(location);

    console.log({
      country_of_origin,
      country_of_origin_coords: getCountryCoords(country_of_origin),
      weight_in_lbs,
      warehouse,
    });

    const eco2mmerce_response = await (
      await fetch(`${ECO2MMERCE_API_URL}/ecommerce`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: location,
          nearest_warehouse: {
            longitude: warehouse.Longitude,
            latitude: warehouse.Latitude,
          },
          item: {
            ...getCountryCoords(country_of_origin),
            weight: parseFloat(weight_in_lbs),
          },
        }),
      })
    ).json();

    console.log(eco2mmerce_response);
  };

  return (
    <Layout>
      <Container my={8}>
        <Heading mb={4}>Calculator</Heading>
        <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.url}>
            <FormLabel>Amazon Link</FormLabel>
            <Input
              placeholder="https://www.amazon.com/dp/B0B3MPLPSS"
              maxW="25rem"
              {...register("url", { required: true })}
            />
            <FormErrorMessage
              children={errors.url && "Please enter a valid Amazon link"}
            />
          </FormControl>
          <Button w="min-content" type="submit" isLoading={isSubmitting}>
            Calculate
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
};

export default CalculatorPage;
