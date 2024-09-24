import clsx from 'clsx';

import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';

import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	open: boolean;
	toggleClick: () => void;
	updateArticleState: (newStyles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	open,
	toggleClick,
	updateArticleState,
}: ArticleParamsFormProps) => {
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);

	const applyChanges = (event: React.FormEvent) => {
		event.preventDefault();

		updateArticleState({
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	const resetToDefault = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setSelectedFontSize(defaultArticleState.fontSizeOption);

		updateArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={open} handleClick={toggleClick} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: open,
				})}>
				<form className={styles.form} onSubmit={applyChanges}>
					<Text as='h2' size={31} weight={800} align='left' family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						onChange={(selected: OptionType) => setSelectedFont(selected)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(selected: OptionType) => setSelectedFontSize(selected)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={(selected: OptionType) => setSelectedFontColor(selected)}
						title='Цвет шрифта'
					/>
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={(selected: OptionType) =>
							setSelectedBackgroundColor(selected)
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={(selected: OptionType) =>
							setSelectedContentWidth(selected)
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetToDefault} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
