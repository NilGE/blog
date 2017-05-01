import katex from 'katex';

function mathInline(state, silent) {
	var pos = state.pos;
	var start = pos;
	var max = state.posMax;
	var starter, ender;

	if (pos + 2 > max) {
		return false;
	}
	if (state.src.slice(pos, pos + 1) === '$') {
    ender = '$';
	} else if (state.src.slice(pos, pos + 3) === '\\\\(') {
    ender = '\\\\)';
	} else {
    return false;
  }

  pos += ender.length;

	if (silent) {
		return false;
	}
	if (state.level >= state.options.maxNesting) {
		return false;
	}

	for (pos; pos + ender.length <= max; pos++) {
		if (state.src.slice(pos, pos + ender.length) === ender) {
			state.push({
				type: 'math_inline',
				content: state.src.slice(start + ender.length, pos), // because starter has the same length with ender, so use ender length to substitute starter length
				starter: starter,
				ender: ender,
				level: state.level
			});
			state.pos = pos + ender.length;
			return true;
		}
	}

	return false;
}

module.exports = (md, options) => {
  md.inline.ruler.before('escape', 'math_inline', mathInline);
  md.renderer.rules.math_inline = function (tokens, idx, options, env) {
  	var rendered;
  	var t = tokens[idx];
  	try {
  		rendered = katex.renderToString(t.content, false, false);
  	} catch (e) {
  		return '<span class="katex-failed">' +
  			t.content +
  			'</span>';
  	}
  	return '<span class="katex-rendered">' + rendered + '</span>';
  }
};
