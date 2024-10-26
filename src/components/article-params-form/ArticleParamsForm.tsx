import clsx from 'clsx';

import { useState, useRef, useEffect } from 'react';
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
	updateArticleState: (newStyles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	updateArticleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const applyChanges = (e: React.FormEvent) => {
		e.preventDefault();
		updateArticleState(articleState);
	};

	const resetToDefault = () => {
		setArticleState(defaultArticleState);
		updateArticleState(defaultArticleState);
	};

	const sidebarRef = useRef<HTMLElement>(null);

	const toggleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [open]);

	return (
		<>
			<ArrowButton isOpen={open} handleClick={toggleClick} />
			<aside
				ref={sidebarRef}
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
						selected={articleState.fontFamilyOption}
						onChange={(selected: OptionType) =>
							setArticleState({ ...articleState, fontFamilyOption: selected })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(selected: OptionType) =>
							setArticleState({ ...articleState, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={articleState.fontColor}
						onChange={(selected: OptionType) =>
							setArticleState({ ...articleState, fontColor: selected })
						}
						title='Цвет шрифта'
					/>
					<Select
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={(selected: OptionType) =>
							setArticleState({ ...articleState, backgroundColor: selected })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={(selected: OptionType) =>
							setArticleState({ ...articleState, contentWidth: selected })
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
