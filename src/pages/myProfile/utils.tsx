import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

export const Tab = styled(TabUnstyled)`
cursor: pointer;
color: #fff;
font-weight: 400;
font-size: 36px;
line-height: 43px;
color: #000000;
background-color: transparent;
width: auto;
padding: 10px 12px;
margin: 6px 6px;
border: none;
display: flex;
justify-content: flex-start;
  transition:all .2s linear;
&:hover {
  box-shadow: 0px 0px 5px gray;

}

&:focus {
  border-bottom: 2px solid #111;
}

&.${tabUnstyledClasses.selected} {
  background-color: #fff;
  border-bottom: 2px solid #111;
}

&.${buttonUnstyledClasses.disabled} {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

export const TabPanel = styled(TabPanelUnstyled)(
    () => `
width: 100%;
font-family: IBM Plex Sans, sans-serif;
font-size: 0.875rem;
border-radius: 12px;
`,
);

export const TabsList = styled(TabsListUnstyled)(
    () => `
width:auto;
border-radius: 12px;
margin-bottom: 16px;
display: flex;
align-items: center;
justify-content: flex-start;
align-content: space-between;

font-weight: 400;
`,
);
