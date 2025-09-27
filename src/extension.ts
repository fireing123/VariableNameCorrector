import * as vscode from 'vscode';
import { divineWords } from './variableCorrector';
import { fixName } from './fixName';
import { abbreviationDictionary, mergeAbbrSets } from './abbreviationDictionary';
import { formatClassNameByLanguage, formatConstantNameByLanguage, formatFunctionNameByLanguage, formatVariableNameByLanguage } from './languageSwitch';

export function activate(context: vscode.ExtensionContext) {
	const customAbbr: Set<string> = new Set(context.globalState.get("customAbbr", []));
	const allAbbr = mergeAbbrSets(abbreviationDictionary, customAbbr);

	context.subscriptions.push(vscode.commands.registerCommand('variablenamecorrector.fixName', () => {
		fixName((oldName, languageId, symbol) => {
			const divined = divineWords(oldName, allAbbr);
			
			switch(symbol?.kind) {
				case vscode.SymbolKind.Class:
					return formatClassNameByLanguage(languageId, divined);
				case vscode.SymbolKind.Function:
					return formatFunctionNameByLanguage(languageId, divined);
				case vscode.SymbolKind.Variable:
				case undefined:
					vscode.window.showWarningMessage("불가함");
					return oldName;
				default:
					return formatVariableNameByLanguage(languageId, divined);
			}

			
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('variablenamecorrector.fixLiteralName', () => {
		fixName((oldName, languageId) => {
			const divined = divineWords(oldName, allAbbr);
	
			return formatConstantNameByLanguage(languageId, divined);
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand("variablenamecorrector.addAbbr", async () => {
	    const input = await vscode.window.showInputBox({
	      prompt: "추가할 약어를 입력하세요 (함수/클래스용, 대문자 권장)",
	    });

		if (!input) {
			return;
		}

	    if (!isUpperCommaSpaceOnly(input)) {
			vscode.window.showInformationMessage(`대문자만 입력가능 can A, B | not a, B | A. B`);
	      	return;
	    }

		const inputs = input.replaceAll(" ", "").split(",");

	    inputs.forEach(element => {
			if (allAbbr.has(element)) {
	    	  vscode.window.showErrorMessage(`이미 존재하는 약어입니다: ${element}`);
	    	  return;
	    	}
		});

	    // 개인 저장값 업데이트
	    const updated = context.globalState.get("customAbbr", []) as string[];
	    
		inputs.forEach(element => {
			updated.push(element);
		});

	    await context.globalState.update("customAbbr", updated);

	    vscode.window.showInformationMessage(`약어 추가 완료: ${input}`);
	}));
}

export function deactivate() { }

function isUpperCommaSpaceOnly(str: string): boolean {
  return /^[A-Z,\s]+$/.test(str) && /[A-Z]/.test(str);
}