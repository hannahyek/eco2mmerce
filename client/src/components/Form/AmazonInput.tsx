import {
  Button,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useLocation, useModal, useCarbon, useProduct } from "../../hooks";
import { getCountryCoords, getNearstWarehouse } from "../../utils";

const AMAZON_API_URL = "https://api.rainforestapi.com/request";
const ECO2MMERCE_API_URL =
  import.meta.env.VITE_ECO2MMERCE_API_URL ?? "https://api.eco2mmerce.tech";

const AmazonInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ url: string }>();
  const location = useLocation();
  const { onOpen } = useModal();
  const [, setCarbon] = useCarbon();
  const [, setProduct] = useProduct();

  const onSubmit = async (data: { url: string }) => {
    const response = await (
      await fetch(
        `${AMAZON_API_URL}?api_key=${
          import.meta.env.VITE_AMAZON_API_KEY
        }&type=product&url=${data.url}`
      )
    ).json();

    setProduct({
      title: response.product.title,
      price: response.product.buybox_winner.price.raw,
      image: response.product.main_image.link,
      link: response.product.link,
    });
    const country_of_origin =
      response?.product?.specifications?.filter(
        (a: { name: string }) =>
          a.name === "Country of Origin" || a.name === "Country"
      )[0]?.value ?? "China";

    let weight =
      response?.product?.weight ??
      response?.product?.specifications?.filter(
        (a: { name: string }) => a.name === "Weight" || a.name === "weight"
      )[0]?.value ??
      "50";

    Number.isNaN(parseFloat(response?.product?.weight?.split(" ")[0]))
      ? (weight = "50")
      : (weight = response?.product?.weight?.split(" ")[0]);

    const warehouse = await getNearstWarehouse(location);

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
            weight: weight ?? 50,
          },
        }),
      })
    ).json();

    const res = Object.fromEntries(
      Object.entries(eco2mmerce_response).map(([k, v]) => [
        k,
        Math.round(v as any),
      ])
    ) as {
      flight_emissions: number;
      total_emissions: number;
      truck_emissions: number;
    };
    setCarbon(res);
    onOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.url}>
        <FormLabel>Enter a link to an Amazon product</FormLabel>
        <InputGroup>
          <Input
            placeholder="https://www.amazon.com/dp/B0B3MPLPSS"
            maxW="25rem"
            borderRightRadius="0"
            {...register("url", { required: true })}
          />
          <Button type="submit" isLoading={isSubmitting} borderLeftRadius="0">
            Calculate
          </Button>
        </InputGroup>
        <FormErrorMessage
          children={errors.url && "Please enter a valid Amazon link"}
        />
      </FormControl>
    </form>
  );
};

export default AmazonInput;
