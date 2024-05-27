import Community from "../components/Community";
import Developer from "../components/Developer";
import About from "../components/About";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <About />
      <Community />
      <Developer />
    </Layout>
  );
}
