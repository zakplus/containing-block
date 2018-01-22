import pj from '../package.json';

/**
 * Find and returns a element containing block.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block
 *
 * @param {Element} el The Element instance whose containing block you're searching for.
 * @returns {Element|Document|Window} Returns the containing block if any, null otherwise.
 */
exports.get = (el) => {
  if (
    typeof Window === 'undefined' ||
    typeof Document === 'undefined' ||
    typeof Element === 'undefined' ||
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !(window instanceof Window) ||
    !(document instanceof Document)
  ) {
    throw new Error('This script must run in a browser.');
  }

  if (el === undefined) {
    throw new Error('"el" parameter is required.');
  }

  if (!(el instanceof Element)) {
    throw new Error('"el" parameter must be a Element instance.');
  }

  // Get the element position style property
  const { position } = window.getComputedStyle(el);

  /*
    If the position property is static or relative,
    the containing block is formed by the edge of
    the content box of the nearest ancestor element
    that is a block container (such as an inline-block,
    block, or list-item element) or which establishes
    a formatting context (such as a table container,
    flex container, grid container, or the block container
    itself)
  */
  if (position === 'static' || position === 'relative') {
    let parent = el.parentElement;
    while (parent) {
      const { display } = window.getComputedStyle(parent);
      if (
        display === 'block' ||
        display === 'inline-block' ||
        display === 'list-item' ||
        display === 'table' ||
        display === 'flex' ||
        display === 'grid'
      ) return parent;
      parent = parent.parentElement;
    }
  }

  /*
    If the position property is absolute, the containing block
    is formed by the edge of the padding box of the nearest
    ancestor element that has a position value other than static
    (fixed, absolute, relative, or sticky).

    If the position property is absolute or fixed,
    the containing block may also be formed by the edge
    of the padding box of the nearest ancestor element
    that has the following:

    A transform or perspective value other than none
    A will-change value of transform or perspective
    A filter value other than none or a will-change value
    of filter (only works on Firefox).
  */
  if (position === 'absolute') {
    let parent = el.parentElement;
    while (parent) {
      const {
        position: parentPosition, transform, filter, willChange,
      } = window.getComputedStyle(parent);
      if (
        parentPosition !== 'static' ||
        transform !== 'none' ||
        willChange === 'transform' ||
        willChange === 'perspective' ||
        filter !== 'none' ||
        willChange === 'filter'
      ) return parent;
      parent = parent.parentElement;
    }
    return window.document;
  }

  /*
    If the position property is fixed, the containing block
    is established by the viewport (in the case of continuous media)
    or the page area (in the case of paged media).

    If the position property is absolute or fixed,
    the containing block may also be formed by the edge
    of the padding box of the nearest ancestor element
    that has the following:

    A transform or perspective value other than none
    A will-change value of transform or perspective
    A filter value other than none or a will-change value
    of filter (only works on Firefox).
  */
  if (position === 'fixed') {
    let parent = el.parentElement;
    while (parent) {
      const { transform, filter, willChange } = window.getComputedStyle(parent);
      if (
        transform !== 'none' ||
        willChange === 'transform' ||
        willChange === 'perspective' ||
        filter !== 'none' ||
        willChange === 'filter'
      ) return parent;
      parent = parent.parentElement;
    }
    return window;
  }

  // Containing block not found
  return null;
};

exports.version = () => pj.version;
