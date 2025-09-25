import { IPaymentMethods } from "lib/models/shop";

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isDarkColor = (hexColor: string) => {
    if (!hexColor) return false
    hexColor = hexColor.replace("#", "");
    const red = parseInt(hexColor.substr(0, 2), 16);
    const green = parseInt(hexColor.substr(2, 2), 16);
    const blue = parseInt(hexColor.substr(4, 2), 16);
    const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
    const threshold = 0.5;
    return luminance < threshold;
}

export const product_image_with_priority = (product: any, priorities: ("m2m" | "cart_item_image" | "main" | "main_thumb")[]): string => {
    const priority_map = {
        m2m: product?.m2m_preview || undefined,
        main: product?.media?.find((el: any) => el?.isMain === "true")?.url || undefined,
        main_thumb: product?.media?.find((el: any) => el?.isMain === "true")?.thumbnail || undefined,
        cart_item_image: product?.image || undefined,
    };

    for (const priority of priorities) {
        if (priority_map[priority] !== undefined) {
            return priority_map[priority];
        }
    }

    return "";
}

export const valid_url = (to_validate: string) => {
    let url;
    try { url = new URL(to_validate) }
    catch (_) { return false }
    return url.protocol === "http:" || url.protocol === "https:";
}

export const payment_methods_serializer = (payment_methods: IPaymentMethods[]) => {
    const result: any[] = payment_methods
        .filter(method => method.isActive)
        .flatMap(method => {
            if (["STRIPE", "COINBASE"].includes(method.type)) return [{ type: method.type }]

            return method.tokens?.filter(token => token.isActive).map(token => ({
                type: method.type,
                token: token.type,
                isCustom: token.tokenId?.isCustom,
                icon: token.tokenId?.icon
            })) || []
        })

    return result.sort((a, b) => {
        if (a?.isCustom && !b?.isCustom) return -1
        if (!a?.isCustom && b?.isCustom) return 1
        return 0
    })
}

export const cart_item_options_to_array_of_variants = (options: any) => {
    let result: { name: string; caption: string; }[] = [];
    Object.keys(options).forEach((key) => {
        if (key !== "quantity" && (options?.[key].caption || options?.[key]?.title)) {
            result.push({ name: key, caption: options?.[key].caption || options?.[key]?.title });
        }
    });
    return result
}

export const isDateExpired = (isoDate: string | null) => {
    if (!isoDate) return true

    const date = new Date(isoDate)
    return date < new Date()
}

export const UTCConverter = (utcTimeString: string): string => {
    const date = new Date(utcTimeString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    return `${formattedDate} (Local time)`;
};

export const currencyConvertion = (amount: number, rate: number, returnUSD: boolean) => {
    if (isNaN(amount) || isNaN(rate)) {
        return 0;
    }
    if (returnUSD) {
        return (amount / rate).toFixed(2);
    } else {
        return (amount * rate).toFixed(2);
    }
}

export const isCustomDomain = !['droplinked.io', 'localhost'].some(domain => window.location.origin.includes(domain));

