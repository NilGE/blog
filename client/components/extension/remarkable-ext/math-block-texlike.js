import katex from 'katex';

function mathBlockTexlike(state, silent) {
	var pos = state.pos;
	var start = pos;
	var max = state.posMax;
	var starter, ender;

	if (pos + 2 > max) {
		return false;
	}
	if (state.src.slice(pos, pos + 2) === '$$') {
    ender = '$$';
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
				type: 'math_block_texlike',
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
  md.inline.ruler.before('math_inline', 'math_block_texlike', mathBlockTexlike);
  md.renderer.rules.math_block_texlike = function (tokens, idx, options, env) {
    return (
    		'<div class="katex-rendered">' +
        katex.renderToString(tokens[idx].content, true, false) +
        '</div>');
  };
};
