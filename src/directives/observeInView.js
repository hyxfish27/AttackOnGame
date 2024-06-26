import _get from 'lodash/get';
import 'intersection-observer';

const DEFAULT_INTERSECTION = Object.freeze({
    threshold: 0.3,
});

const vInView = {
    mounted(el, binding) {
        const theElement = el;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach(({ target, isIntersecting }) => {
                    if (isIntersecting) {
                        target.classList.add('in-view');
                    } else {
                        target.classList.remove('in-view');
                    }
                    if (_get(binding, 'value.once') && isIntersecting) {
                        target.io.unobserve(target);
                        target.io.disconnect();
                    }
                    if (typeof _get(binding, 'value.callback') === 'function') {
                        binding.value.callback.call(null, isIntersecting);
                    }
                });
            },
            _get(binding, 'value.intersection', DEFAULT_INTERSECTION)
        );
        io.observe(el);
        theElement.io = io;
    },
    unmounted(el) {
        if (el.io) el.io.disconnect();
    },
};

export default vInView;
