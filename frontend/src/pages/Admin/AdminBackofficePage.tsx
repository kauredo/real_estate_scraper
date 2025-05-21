import React, { useState, useEffect } from "react";
import {
  adminGetClubUsers,
  adminGetNewsletterSubscriptions,
  adminGetVariables,
} from "../../services/api";
import ListingsManagement from "./AdminListingsManagement";
import SystemSettings from "./AdminSystemSettings";
import ClubUsers from "./AdminClubUsers";

const AdminBackofficePage = () => {
  const [variables, setVariables] = useState([]);
  const [subs, setSubs] = useState([]);
  const [clubUsers, setClubUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [variablesRes, subsRes, clubUsersRes] = await Promise.all([
          adminGetVariables(),
          adminGetNewsletterSubscriptions(),
          adminGetClubUsers(),
        ]);

        setVariables(variablesRes.data);
        setSubs(subsRes.data);
        setClubUsers(clubUsersRes.data);
      } catch (error) {
        console.error("Error fetching backoffice data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center h-64">
        <div className="text-xl text-dark dark:text-light">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-16">
      <ListingsManagement />
      <SystemSettings variables={variables} subs={subs} />
      <ClubUsers clubUsers={clubUsers} />
    </div>
  );
};

export default AdminBackofficePage;
