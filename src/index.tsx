import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [open, setOpen] = useState(false);

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateArticleState = (newStyles: ArticleStateType) => {
		setArticleState(newStyles);
	};

	const toggleClick = () => {
		setOpen(!open);
	};

	const closeSidebar = () => {
		setOpen(false);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				open={open}
				toggleClick={toggleClick}
				updateArticleState={updateArticleState}
			/>
			<Article onClickArticle={closeSidebar} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
