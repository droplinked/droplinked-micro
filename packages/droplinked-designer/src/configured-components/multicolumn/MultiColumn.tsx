import AppContainer from "components/legacy-components/container/AppContainer";
import useThemeInfo from "hooks/useThemeInfo";
import React from "react";

export interface CardContent {
    title: string;
    subtitle: string;
}

export interface MultiColumnProps {
    card1: CardContent;
    card2: CardContent;
    card3: CardContent;
    card4: CardContent;
}

const MultiColumn: React.FC<MultiColumnProps> = ({ card1, card2, card3, card4 }) => {
    const { isDarkTheme } = useThemeInfo()
    const subTextColor = isDarkTheme ? "text-text-subtextPlaceholder-Light" : "text-text-subtextPlaceholder-Dark";

    const cards = [card1, card2, card3, card4];

    return (
        <AppContainer props={{ margin: "auto" }}>
            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-y-6 2xl:gap-x-6 p-4 md:p-6 border border-shop-borderColor rounded-lg w-full"
            >
                {cards.map((card, idx) => (
                    <div key={idx}>
                        <h3 className="text-base xl:text-lg font-bold mb-1 text-shop-textColor">{card.title}</h3>
                        <p className={`text-sm ${subTextColor} font-normal`}>{card.subtitle}</p>
                    </div>
                ))}
            </div>
        </AppContainer>
    );
};

export default MultiColumn; 