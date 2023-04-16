import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { copyTextToClipboard } from '../utility/clipboard';
import { v4 } from 'uuid';

interface ItemWrapper {
	value: string;
	isCopied: boolean;
}

const App = () => {
	const [size] = useState<number>(200); // change as necessary
	const [items, setItems] = useState<ItemWrapper[]>([]);
	
	useEffect(() => {
		const generate: ItemWrapper[] = [];
		for (let i = 0; i < size; i++) {
			generate.push({
				value: v4(),
				isCopied: false,
			});
		}
		setItems(generate);
	}, [size]);

	const copyHandler = (e: JSX.TargetedMouseEvent<HTMLButtonElement>, data: ItemWrapper) => {
		e.preventDefault();
		
		// copy to clipboard
		copyTextToClipboard(data.value);

		const newState = items.map(i => {
			return {
				...i,
				isCopied: i.isCopied || i.value === data.value ? true : false,
			}
		});
		setItems(newState);
	};

	return (
		<div id="app">
			<main>
				<table>
					<thead>
						<tr>
							<td><b>UUID version 4</b></td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{items.map((v, i) => (
							<tr id={i.toString()}>
								<td>{v.value}</td>
								<td>
									<button onClick={(e) => { copyHandler(e, v) }}>
										{v.isCopied ? "copied" : "copy"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
}

export default App;
