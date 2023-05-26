import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';
import { styled } from '@mui/system';

export const StyledTab = styled(Tab)`
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

&.${tabClasses.selected} {
  background-color: #fff;
  border-bottom: 2px solid #111;
}
`;

export const StyledTabPanel = styled(TabPanel)(
  () => `
width: 100%;
font-family: IBM Plex Sans, sans-serif;
font-size: 0.875rem;
border-radius: 12px;
`,
);

export const StyledTabsList = styled(TabsList)(
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
