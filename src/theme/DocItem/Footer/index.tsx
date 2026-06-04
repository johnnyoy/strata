import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Tutorials from '@site/src/components/Tutorials';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props) {
  const {frontMatter} = useDoc();
  const tutorials = (frontMatter as {tutorials?: {label: string; url: string}[]}).tutorials;

  return (
    <>
      {tutorials && tutorials.length > 0 && <Tutorials links={tutorials} />}
      <Footer {...props} />
    </>
  );
}
