import * as vscode from 'vscode';
import { divineWords, toSnakeCase } from './variableCorrector';

export async function fixName() {
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

	const divined = divineWords(selectedText);

	const newSelected = toSnakeCase(divined);


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