import * as vscode from 'vscode';

export async function fixName(func: (oldName: string, languageId: string, symbol?: vscode.DocumentSymbol) => string) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	let selection = editor.selection;

	const wordRange = document.getWordRangeAtPosition(selection.active);
	if (!wordRange) {
		return;
	}

	const fullName = document.getText(wordRange);

	let selectedText: string;
	let startOffset: number;
	let endOffset: number;

	if (!selection.isEmpty) {
		selectedText = document.getText(selection);
		startOffset = selection.start.character - wordRange.start.character;
		endOffset = selection.end.character - wordRange.start.character;
	} else {
		selectedText = fullName;
		startOffset = 0;
		endOffset = fullName.length;
	}

	const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        "vscode.executeDocumentSymbolProvider",
        document.uri
    );

	const symbol = findSymbol(symbols, selection.active);

	const newSelected = func(selectedText, document.languageId, symbol);

	const newName = fullName.slice(0, startOffset) + newSelected + fullName.slice(endOffset);

	const references = await vscode.commands.executeCommand<vscode.Location[]>(
		'vscode.executeReferenceProvider',
		document.uri,
		wordRange.start
	);

	if (!references) {
		return;
	}

	// WorkspaceEdit 적용
	const edit = new vscode.WorkspaceEdit();
	references.forEach(loc => edit.replace(loc.uri, loc.range, newName));
	await vscode.workspace.applyEdit(edit);
}

function findSymbol(symbols: vscode.DocumentSymbol[], pos: vscode.Position): vscode.DocumentSymbol | undefined {
	for (const sym of symbols) {
		if (sym.range.contains(pos)) {
			if (sym.children.length > 0) {
				const child = findSymbol(sym.children, pos);
				return child ?? sym;
			}
			return sym;
		}
	}
	return undefined;
}