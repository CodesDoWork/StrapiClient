# Strapi Client

A simple strapi client for your web application.

## 1. Installation

```commandline
npm i @codesdowork/strapi_client
```

## 2. Usage

Import the client and use your custom types the following way:

```ts
import StrapiClient from "@codesdowork/strapi_client";

type StrapiTypes = {
    user: {
        get: User;
        send: SendUserForm;
    };
    restaurants: {
        get: Restaurant;
        send: SendRestaurantForm;
    };
    todos: Todo;
}

const strapi = new StrapiClient<StrapiTypes>("http://localhost:1337")
```

You can add types for any collection and additionally for `user` and `strapiFile`.
You can either add types for responses (`get`) and requests (`send`) or combine them directly
as made for `todos` in the example above.